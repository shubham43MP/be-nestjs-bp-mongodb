import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('healthz')
export class HealthzController {
  private readonly logger = new Logger();
  @Get('/')
  @ApiOperation({ summary: 'Server health check endpoint' })
  async healthCheck(): Promise<{ data: string }> {
    this.logger.log('Checking health of the Servers');
    return { data: 'Server is healthy!' };
  }
}
