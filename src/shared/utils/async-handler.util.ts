import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

export async function handleAsyncOperation<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const logger = new Logger('Exception');
    if (error?.response?.code) {
      logger.error(`${errorMessage} =>  ${error.response.code}`);
    } else {
      logger.error(`${errorMessage} =>  ${error}`);
    }

    // Check if the caught error is an instance of an HTTP exception
    if (error instanceof HttpException) {
      throw error; // Rethrow the original exception
    }

    // If it's not an HTTP exception, throw InternalServerErrorException or another generic exception
    throw new InternalServerErrorException(errorMessage, error.stack);
  }
}
