import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../../service/http/room.service';
import { RoomModel } from '../../../../models/room.model';
import { CompanyModel } from '../../../../models/company.model';
import { CompanySecurityModel } from '../../../../models/company-security.model';
import { CompanyService } from '../../../../service/http/company.service';
import { GenreModel } from '../../../../models/genre.model';
import { GenreService } from '../../../../service/genre.service';
import { ComplexityModel } from '../../../../models/complexity.model';
import { ComplexityService } from '../../../../service/complexity.service';
import { MarkingModel} from '../../../../models/marking.model';
import { MarkingService } from '../../../../service/marking.service';

@Component({
  selector: 'app-admin-rooms-edit',
  templateUrl: './admin-rooms-edit.component.html',
  styleUrls: ['./admin-rooms-edit.component.scss']
})
export class AdminRoomsEditComponent implements OnInit {
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  room: RoomModel = new RoomModel();
  genres: GenreModel[] = [];
  complexities: ComplexityModel[] = [];
  markings: MarkingModel[] = [];

  constructor (
    private activeRoute: ActivatedRoute,
    public roomService: RoomService,
    public companyService: CompanyService,
    public genreService: GenreService,
    public complexityService: ComplexityService,
    public markingService: MarkingService,
  ) {
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
    });
    genreService.all().subscribe((genres: GenreModel[]) => {
      this.genres = genres;
    });
    complexityService.all().subscribe((complexities: ComplexityModel[]) => {
      this.complexities = complexities;
    });
    markingService.all().subscribe((markings: MarkingModel[]) => {
      this.markings = markings;
      this.markings.forEach((marking: MarkingModel) => {
        this.room.marking.forEach((mark: MarkingModel) => {
          if (!marking.checked) {
            marking.checked = marking.id === mark.id;
          }
        });
      });
    });
  }


  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      if (data['room']) {
        this.room = data['room'];
      }
    });
  }

  save() {
    this.roomService.addRoom(this.room).then(() => {
    }, (error) => {
      console.log(error);
    });
  }

}
