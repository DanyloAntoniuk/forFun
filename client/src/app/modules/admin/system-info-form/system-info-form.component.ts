import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-system-info-form',
  templateUrl: './system-info-form.component.html',
  styleUrls: ['./system-info-form.component.scss']
})
export class SystemInfoFormComponent implements OnInit, OnChanges {
  @Input()
  config: FieldConfig[] = [];

  constructor() { }

  ngOnInit() {
    // console.log(this.systemInfoConfig);
  }

  ngOnChanges() {
    console.log(this.config);
  }

}
