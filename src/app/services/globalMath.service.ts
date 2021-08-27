import { Injectable } from '@angular/core';

@Injectable()
export class GlobalMathService {

  constructor() { }
  
  nativeGlobal() { return window }

}