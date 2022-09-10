import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { FilterService } from 'primeng/api';
import { CountryService } from './countryservice';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CountryService, FilterService],
})
export class AppComponent {
  selectedCountry: any;

  countries: any[];
  filteredCountries: any[];
  selectedCountries: any[];
  formdata: FormGroup;

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.countryService.getCountries().then((countries) => {
      this.countries = countries;
    });
    this.formdata = this.fb.group({
      country: [''],
    });
  }

  filterCountry(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
