import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProviderService} from "../services/provider.service";
import {capitalizeText} from "../services/utils";
import {DynamicControlData} from "../services/domain/dynamic.control.data";
import {CameraSocketService} from "../services/camera-socket.service";
import {DomSanitizer} from "@angular/platform-browser";

const WAITING_MESSAGE = "...waiting for response";

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent<OUT> implements OnInit {

  @Input() providerService: ProviderService<OUT> | undefined;
  @Input() params: Map<string, string> = new Map();
  @Input() title: string | undefined;
  @Input() prefix: string | undefined;
  basicMessage: string | undefined;
  errorMessage: string | undefined | null;
  currentState: DynamicControlData[] = [];
  emptyMessage: string | undefined;
  imageSrc: any;

  constructor(public cameraSocketService: CameraSocketService) {
    this.emptyMessage = this.basicMessage;
  }

  ngOnInit(): void {
    this.currentState = this.controlNames();
    this.providerService?.eventEmitter().subscribe(sendInfo => {
      this.basicMessage = this.basicMessage?.replace(WAITING_MESSAGE, "");
      this.basicMessage = `${this.basicMessage}\n${JSON.stringify(sendInfo)}`;
    })
  }

  sendRequest() {
    this.params.clear();
    this.errorMessage = null;
    this.basicMessage = WAITING_MESSAGE;
    this.currentState.forEach(entry => {
      this.params.set(entry.param.replace(`${this.prefix}-`, ""), entry.value);
    })
    this.providerService?.retrieveWelcomeMessage(this.params).subscribe(
      data => {
        this.basicMessage = `${data}\n\n${this.basicMessage}`;
      }, error => {
        this.errorMessage = JSON.stringify(error);
      })
    this.providerService?.getImage(this.params).subscribe(response => this.imageSrc = 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(response))));
  }

  controlNames(): DynamicControlData[] {
    return this.calculateCurrentState();
  }

  calculateCurrentState() {
    let controlMap: Map<string, string> = this.params;
    if (this.params) {
      return Array.from(this.params.keys()).map(name => {
        return {
          name: capitalizeText(name),
          param: `${this.prefix}-${name}`,
          value: controlMap.get(name) || ""
        }
      });
    } else return [];
  }

  getStatus = () => {
    const status = this.cameraSocketService.getStatus(this.prefix || "");
    if (status != 'UP') {
      this.basicMessage = this.emptyMessage;
    }
    return status;
  }
}
