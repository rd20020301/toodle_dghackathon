import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlobalMathService } from '../services/globalMath.service';
// const MathJax = Window['mathjax'];
@Component({
    selector: 'mathjax',
    inputs: ['content'],
    templateUrl: './mathjax.component.html',
    styleUrls: ['./mathjax.component.css']
})
export class MathjaxComponent implements OnChanges {
    @Input() content: string;

    constructor(public gs: GlobalMathService) { }
    mathJaxObject;
    ngOnChanges(changes: SimpleChanges) {
        if (changes['content']) {
            // console.log("content chnaged")
            this.renderMath()
        }
    }

    renderMath() {        
        this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
        //setInterval(()=>{},1) 
        let angObj = this;
        setTimeout(() => {            
            angObj.mathJaxObject.Hub.Queue(["Typeset", angObj.mathJaxObject.Hub], 'mathContent');

        }, 1000)
    }
    loadMathConfig() {    
        this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
        this.mathJaxObject.Hub.Config({
            showMathMenu: false,
            tex2jax: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
            menuSettings: { zoom: "Double-Click", zscale: "150%" },
            CommonHTML: { linebreaks: { automatic: true } },
            "HTML-CSS": { linebreaks: { automatic: true } },
            SVG: { linebreaks: { automatic: true } }
        });
    }

    ngOnInit() {

        this.loadMathConfig()
        this.renderMath();

    }

}