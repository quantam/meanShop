import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products = [{
    id: 123456,
    name: 'Hp Gaming',
    category: 'laptop',
    price: 50000,
    stock: 50,
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  },
  {
    id: 123456,
    name: 'Hp Gaming',
    category: 'laptop',
    price: 50000,
    stock: 50,
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  },
  {
    id: 123456,
    name: 'Hp Gaming',
    category: 'laptop',
    price: 50000,
    stock: 50,
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  },
  {
    id: 123456,
    name: 'Hp Gaming',
    category: 'laptop',
    price: 50000,
    stock: 50,
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  }];
  constructor() { }

  ngOnInit() {
  }

}
