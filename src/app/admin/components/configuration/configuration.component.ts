import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/http/config.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  maxCountOfPlayers: number;

  constructor(private configService: ConfigService) {
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value || 0;
    });
  }

  ngOnInit() {
  }

  save() {
    this.configService.changeMaxCountOfPlayers(this.maxCountOfPlayers)
      .then(() => {})
      .catch((error) => { console.log(error); });
  }
}
