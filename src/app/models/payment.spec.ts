import { Payment } from './payment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import{HttpTestingController} from '@angular/common/http/testing';
import{HttpClientModule}from '@angular/common/http';

describe('Payment', () => {
  it('should create an instance', () => {
    expect(new Payment(
      "hanna",
      "detail"
    )).toBeTruthy();
  });
});
