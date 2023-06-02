import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { config } from "aws-sdk";
import { createProxyMiddleware } from 'http-proxy-middleware';

const start = async() => {
  try{
      const PORT = process.env.PORT || 5001;
      const app = await NestFactory.create(AppModule);

      const configService = app.get(ConfigService);
      config.update({
          accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          region: configService.get('AWS_REGION'),
      });

      app.enableCors();

      await app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));
  }catch (e){
      console.log(e);
  }
}

start();
