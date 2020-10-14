import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import {shareReplay} from 'rxjs/operators';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[NgbCarouselConfig]
})
export class ProductComponent implements OnInit {
  products$:Observable<any>;
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1300/200`);

  constructor(private searchService: SearchService, config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.products$ = this.searchService.getProducts(10, 1).pipe(shareReplay());
  }

  getUrl(id){
    return 'product-detail/id'+id;
  }

}
