import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  level: 'info',

  format: format.combine(
    format.timestamp(),
    format.json(),

    nestWinstonModuleUtilities.format.nestLike('Lawyer', {
      colors: true,
      prettyPrint: true,
    }),
  ),

  transports: [new transports.Console()],
};
