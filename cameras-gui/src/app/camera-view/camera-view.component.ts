import {Component, Input, OnInit} from '@angular/core';
import {ProviderService} from "../services/provider.service";
import {HMACInput} from "../services/domain/hmac.input";

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent<IN, OUT> implements OnInit {

  @Input() providerService: ProviderService<IN, OUT> | undefined;
  @Input() params: IN | undefined;
  @Input() title: string | undefined;
  basicMessage: OUT | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.providerService?.findCameraBasicAuthMessage(this.params).subscribe(data => {
      this.basicMessage = data
    })
  }
}
