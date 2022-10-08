export interface Config {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;
  pmcCompilerUrl: string;
}

export class EnvironmentConfig implements Config {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;
  pmcCompilerUrl: string;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.dbUrl = process.env.DATABASE_URL;
    this.jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this.jwtAccessTokenDuration = process.env.JWT_ACCESS_TOKEN_DURATION;
    this.pmcCompilerUrl = process.env.PMC_COMPILER_URL;
  }
}
export const environmentConfig = new EnvironmentConfig();
