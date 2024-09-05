// ANOTAÇÃO SOBRE RESULTADOS DE FUNÇÕES DENTRO DE FUNÇÕES
/**
 * Não sabemos ao certo como proceder diante desse impasse porém vamos (Fernanda, Mathiro) deixar rascunhado os esboços das funções, juntamente com as variáveis que definimos para a nossa funcionalidade - Equipamento.
 */

let eSingleVessel; // Variavel booleana; referente ao campo "É Singlevessel" da tabela
let usaChiller; // Variavel booleana; referente ao campo "Usa Chiller" da tabela
let esquentaAguaLavagemMash; // Variavel booleana; referente ao campo "Esquentar a água da lavagem antes do mash?" da tabela

function pesoMalte() {
  //campo especifico que vem da receita
}
function temperaturaPrimeiraRampa() {
  //campo especifico que vem da receita
}
function taxaEvaporacao(volumeAntesFervuraV, volumeAposFervuraV) {
  // =((D31)/D32-1)

  volumeAntesFervuraV = volumeAntesFervura();
  volumeAposFervuraV = volumeAposFervura();
  let resultado = volumeAntesFervuraV / (volumeAposFervuraV - 1);
  return resultado;
}
function aguaMash(eSingleVessel, volumeDeadSpace, volumeAbaixoFundoFalso, pesoMalteV) {
  let resultado;

  pesoMalteV = pesoMalte();

  if (eSingleVessel === false) {
    if (volumeAbaixoFundoFalso === 0) {
      resultado = pesoMalteV * 3.2 + volumeDeadSpace;
    } else {
      resultado = pesoMalteV * 3.2 + volumeAbaixoFundoFalso;
    }
  } else {
    resultado = pesoMalteV * 3.2;
  }

  return resultado;
}

function temperaturaAguaMash(a, temperaturaPrimeiraRampaV, pesoMalteV, aguaMashV) {
  // calculo do excel: =0,44*(D22-D24)*(D21)/(D27)+D22
  temperaturaPrimeiraRampaV = temperaturaPrimeiraRampa();
  pesoMalteV = pesoMalte();
  aguaMashV = aguaMash();

  let resultado =
    (0.44 * (temperaturaPrimeiraRampaV - temperaturaMalte) * pesoMalteV) / (aguaMashV + temperaturaPrimeiraRampaV);
  return resultado;
}

function aguaLavagem(
  volumePerdidoEvaporacao,
  absorcaoEstimada,
  pesoMalteV,
  volumeFinalCervDesejado,
  volumeTrubQuente,
  volumeTrubFrio,
  contracaoLiquido
) {
  // calculo do excel: =(D11+D15)*D21-(3,2*D21)+(D16+D12+D13)/(1-D14)

  pesoMalteV = pesoMalte();
  let resultado =
    (volumePerdidoEvaporacao + absorcaoEstimada) * pesoMalteV -
    3.2 * pesoMalteV +
    (volumeFinalCervDesejado + volumeTrubQuente + volumeTrubFrio) / (1 - contracaoLiquido);

  return resultado;
}

function totalAgua(aguaMashV, aguaLavagemV) {
  aguaMashV = aguaMash();
  aguaLavagemV = aguaLavagem();

  let resultado = aguaMashV + aguaLavagemV;

  return resultado;
}

function volumeAntesFervura(eSingleVessel, totalAguaV, absorcaoEstimada, pesoMalteV, volumeDeadSpace) {
  let resultado;

  totalAguaV = totalAgua();
  pesoMalteV = pesoMalte();

  if (eSingleVessel === false) {
    resultado = totalAguaV - absorcaoEstimada * pesoMalteV - volumeDeadSpace;
  } else {
    resultado = totalAguaV - absorcaoEstimada * pesoMalteV;
  }

  return resultado;
}

function volumeAposFervura(volumePerdidoEvaporacao, volumeAntesFervuraV) {
  volumeAntesFervuraV = volumeAntesFervura();

  let resultado = volumePerdidoEvaporacao - volumeAntesFervuraV;
  return resultado;
}

function volumeAposResfriamento(volumeAposFervuraV, contracaoLiquido) {
  // calculo do excel: =D32*(1-D14)

  volumeAposFervuraV = volumeAposFervura();

  let resultado = volumeAposFervuraV * (1 - contracaoLiquido);
  return resultado;
}

function volumeFermentador(volumeTrubQuente, volumeAposResfriamentoV) {
  volumeAposResfriamentoV = volumeAposResfriamento();
  let resultado = volumeTrubQuente - volumeAposResfriamentoV;
  return resultado;
}

function volumeEnvase(volumeTrubFrio, volumeFermentadorV) {
  volumeFermentadorV = volumeFermentador();
  let resultado = volumeTrubFrio - volumeFermentadorV;
  return resultado;
}

function areaFundoPanela(diametroPanela) {
  //calculo do excel: =(D17/2)*(D17/2)*3,14159
  let resultado = (diametroPanela / 2) * (diametroPanela / 2) * 3.14159;
  return resultado;
}

function areaAbertaPanela(diametroAberturaPanela) {
  //calculo do excel: =(D18/2)^(2)*3,14159
  let resultado = (diametroAberturaPanela / 2) ** 2 * 3.14159; // Conta com exponenciação (**)

  return resultado;
}

function tempoMostoAtingir(
  a,
  temperaturaAmbiente,
  c,
  temperaturaDefinidaParaMosto,
  volumeAposFervuraV,
  areaAbertaPanelaV
) {
  let resultado;

  volumeAposFervuraV = volumeAposFervura();
  areaAbertaPanelaV = areaAbertaPanela();

  // C71: CAMPO QUE VEM DO MÓDULO RECEITA

  if (usaChiller === true) {
    resultado =
      (Math.log((100 - temperaturaAmbiente) / (temperaturaDefinidaParaMosto - temperaturaAmbiente)) *
        4 *
        10000 *
        volumeAposFervuraV *
        C71) /
      (7 * 0.209 * areaAbertaPanelaV) /
      60;
  } else {
    resultado =
      (Math.log((100 - temperaturaAmbiente) / (temperaturaDefinidaParaMosto - temperaturaAmbiente)) *
        4 *
        10000 *
        volumeAposFervuraV *
        C71) /
      (0.209 * areaAbertaPanelaV) /
      60;
  }

  return resultado;
}

function seFerverAguaLavagemEstara(temperaturaAmbiente, aguaLavagemV, c, areaFundoPanelaV, e) {
  let resultado;
  aguaLavagemV = aguaLavagem();
  areaFundoPanelaV = areaFundoPanela();

  //I64: VEM DE OUTRO MÓDULO

  if (esquentaAguaLavagemMash === FALSE) {
    resultado = 76;
  } else {
    resultado =
      (100 - temperaturaAmbiente) *
        Math.exp(-(I64 * 60) * ((0.204 * areaFundoPanelaV) / (4.2 * aguaLavagemV * 10000))) +
      temperaturaAmbiente;
  }

  return resultado;
}

/* TESTES
console.log('Resultado da fervura: ', volumeAposFervura(10, 5));
*/
