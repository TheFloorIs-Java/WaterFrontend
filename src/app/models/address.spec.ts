import { Address } from './address';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import{HttpTestingController} from '@angular/common/http/testing';
import{HttpClientModule}from '@angular/common/http';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address(
      "john",
     " test",
     "123 test road",
     "345 test road",
     "silver spring",
    " MD",
    "209010",
    "USA"

    )).toBeTruthy();
  });
});
