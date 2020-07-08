import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public valor1: number;
  public valor2: number;
  public resultado: number;
  public adicao: number;
  public multiplicacao: number;
  public subtracao: number;
  public divisao: number;
  public limpa: null;

  public somar(){
    let adicao = this.valor1 + this.valor2;
    this.adicao = adicao;
  }
  public multiplicar(){
    let multiplicacao = this.valor1 * this.valor2;
    this.multiplicacao = multiplicacao;
  }
  public subtrair(){
    let subtracao = this.valor1 - this.valor2;
    this.subtracao = subtracao;

  }
  public dividir(){
    let divisao = this.valor1 / this.valor2;
    this.divisao = divisao;

  }
  public limpar(){
    let limpa = this.limpa;
    this.valor1 = limpa
    this.valor2 = limpa
    this.adicao = limpa
    this.multiplicacao = limpa
    this.subtracao = limpa
    this.divisao = limpa;
  }

}