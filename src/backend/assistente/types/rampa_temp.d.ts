/**
 * @file Este arquivo contém todos os tipos necessários para as operações da tabela "Rampa de Temperatura"
 *
 * @author Enrico Vivan
 */

const rampaTemp = ['Acidificação', 'Proteica', 'Sacarificação (β)', 'Sacarificação (α)', 'Mash Out'] as const;

export type RampaTemp = {
  etapa: number; //indice da rampa de temperatura
  rampa: string;
  tempInicialAgua: number;
  temperatura: number;
  tempo: number;
};

export type BrassagemFirebase = {
  id: string;
  perfil: PerfilBrassagemFirebase[];
};

export type MashStepsFirebase = {
  MS_INFUSION_TEMP_1: string;
  MS_INFUSION_TEMP_2: string;
  MS_INFUSION_TEMP_3: string;
  MS_INFUSION_TEMP_4: string;
  MS_INFUSION_TEMP_5: string;

  MS_RISE_TIME_1: number;
  MS_RISE_TIME_2: number;
  MS_RISE_TIME_3: number;
  MS_RISE_TIME_4: number;
  MS_RISE_TIME_5: number;

  MashName: string;

  MashStep_F_MS_NAME_1: string;
  MashStep_F_MS_NAME_2: string;
  MashStep_F_MS_NAME_3: string;
  MashStep_F_MS_NAME_4: string;
  MashStep_F_MS_NAME_5: string;

  STEP_TEMP_1: string;
  STEP_TEMP_2: string;
  STEP_TEMP_3: string;
  STEP_TEMP_4: string;
  STEP_TEMP_5: string;

  STEP_TIME_1: string;
  STEP_TIME_2: string;
  STEP_TIME_3: string;
  STEP_TIME_4: string;
  STEP_TIME_5: string;

  __1: string;
  __2: string;
  __3: string;
};

export type Rampa = (typeof rampaTemp)[number];

type PerfilBrassagemFirebase = {
  time: string;
  nomePerfil: string;
  temp: number;
  mashStep?: string;
};
