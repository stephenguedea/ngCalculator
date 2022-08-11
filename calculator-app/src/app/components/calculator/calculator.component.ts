import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  input: string = '';
  result: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // do not allow more than once
  numberEntered(num: string) {
    if (num == '.') {
      if(this.input != '') {
        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."));

      }
    }

    // do not allow 0 at beginning
    if (num == '0') {
      if (this.input == '') {
        return;
      }

      const prevKey = this.input[this.input.length - 1];
      if (prevKey === '/' || prevKey === '*' || prevKey === '-' || prevKey === '+') {
        return;
      }
    }

    this.input = this.input + num;
    this.calculateAnswer();
  }

  getLastOperand() {
    let position: number;
    console.log("last operand: ", this.input);

    position = this.input.toString().lastIndexOf("+");
    if (this.input.toString().lastIndexOf("-") > position) {
      position = this.input.lastIndexOf('-');
    }
    if (this.input.toString().lastIndexOf("/") > position) {
      position = this.input.lastIndexOf('/');
    }
    if (this.input.toString().lastIndexOf("*") > position) {
      position = this.input.lastIndexOf('*');
    }
    console.log("LAST: ", this.input.substr(position + 1));
    return this.input.substr(position + 1);
  }

  operatorPressed(op: string) {
    // doesn't allow operators more than once
    const lastKey = this.input[this.input.length -1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }
    this.input = this.input + op;
    this.calculateAnswer();
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length -1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calculateAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula=formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      formula = formula.substr(0, formula.length - 1 );
    }

    console.log("FORMULA: ", formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calculateAnswer();
    this.input = this.result;
    if (this.input == '0') {
      this.input = '';
    }
  }

    // KEYBOARD SUPPORT
    // @HostListener('window:keydown', ['$event'])
    // onKeyDown(event: KeyboardEvent) {
    //   const key = event.key.toLowerCase();

    //   event.preventDefault();

    //   if (key === 'c' || key === 'backspace') {
    //     this.clear();
    //   } else if (key === 'enter') {
    //     this.getAnswer();
    //   }
    // }

}
