import {Component, Input, OnInit} from '@angular/core';
import {ProviderService} from "../services/provider.service";

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent implements OnInit {

  @Input() providerService: ProviderService | undefined;
  @Input() title: string | undefined;
  basicMessage: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.providerService?.findCameraBasicAuthMessage("cameraUser1","administrator").subscribe(data => {
      this.basicMessage = data;
    })
  }
}
