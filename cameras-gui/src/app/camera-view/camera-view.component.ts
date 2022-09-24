import {Component, Input, OnInit} from '@angular/core';
import {ProviderService} from "../services/provider.service";
import {capitalizeText} from "../services/utils";
import {DynamicControlData} from "../services/domain/dynamic.control.data";

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
  basicMessage: OUT | undefined;
  currentState: DynamicControlData[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.currentState = this.controlNames();
  }

  sendRequest() {
    console.log(this.params)
    this.params.clear();
    this.currentState.forEach(entry => {
      this.params.set(entry.param.replace(`${this.prefix}-`, ""), entry.value);
    })
    console.log(this.params)
    this.providerService?.findCameraBasicAuthMessage(this.params).subscribe(data => {
      this.basicMessage = data
    })
  }

  controlNames(): DynamicControlData[] {
    return  this.calculateCurrentState();
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
}
