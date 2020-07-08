import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertControler } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // variaveis globais
  public calculo = ''; // variavel que mostra o calculo na tela (vazia)
  public resultado: string; // variavel que mostra o resultado na tela (null)

  private ponto = false;

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertControler) { }

  // metodo para add um numero na tela
  adicionarNumero(valor: string) { // valor = numero que o usuario digita transformado em texto

    if (this.resultado) {
      this.apagarTudo(); // limpa a calculadora antes de inserir o proximo valor
    }
    this.calculo = this.calculo + valor;
  }

  //metodo que verifica se tem algum ponto na tela para que o usuario consiga add dois pontos ou mais
  adicionarPonto() {
    if (this.ponto) {
      return; // return vazio = executa um metodo parando a execução e retornando vazio
    }

    // o codigo abaixo só é executado quando não estiver nenhum ponto inserido pelo usuario
    this.calculo += "."; // tambem pode ser escrita: this.calculo = this.calculo + valor;
    this.ponto = true;
  }

  // metodo que add os calculos seguidos um do outro
  adicionarOperacao(operador: string) {

    // usa o resultado do calculo como continuação para a próxima operação
    if (this.resultado) {
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }

    const ultimo = this.calculo.slice(-1);
    if (this.operacoes.indexOf(ultimo) > -1) {
      return;
    }
    // indexOf = procura dentro da variavel "operações" o ultimo caractere

    this.calculo += operador;
    this.ponto = false; // deixa o ultimo ponto inserido como falso para que possa ser inserido outros pontos na operacao
  }

  // metodo que zera somente a calculadora
  public apagarTudo() {
    this.calculo = ''; // variavel vazia
    this.resultado = null; // limpa tudo o que esta na variavel resultado
    this.ponto = false; // limpa a calculadora permitindo inserir um ponto
  }

  // metodo que zera apenas a ultima variavel inserida pelo usuario
  apagarUltimo() {
    // verifica se a ultima variavel inserida é um ponto
    const ultimo = this.calculo.slice(-1); // slice = o metodo slice slice apaga tudo que esta dentro da variavel calculo desde o inicio
    if (ultimo == '.') {
      this.ponto = false;
    }
    this.calculo = this.calculo.slice(0 - 1);
  }

  // metodo que calcula o resultado das operações desejadas pelo usuario
  public calcularResultado() {
    // o "try" tenta executar o código para exibir o resultado e caso dê algum erro, o CATCH exibirá a mensagem de erro
    try {
      this.resultado = evaluate(this.calculo);
    } catch (e) {
      this.resultado = '';
      this.presentAlert('ERRO', 'Calculo inválido, verifique!');
    }
  }

  async presentAlert(titulo: String, mensagem: String) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
