import { TestBed } from '@angular/core/testing';
import { Product } from './product';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import{HttpTestingController} from '@angular/common/http/testing';
import{HttpClientModule}from '@angular/common/http';

describe('Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClientTestingModule ,
      ],
    });
  });





  it('should create an instance', () => {
    expect(new Product(
      1,
      "tom",
      2,
      "good product",
      19.99,
      "picture"
    )).toBeTruthy();
  });
});
