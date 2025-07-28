"use server";

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import dotenv from 'dotenv';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from "openai";

import { AngularAppEngine, createRequestHandler } from '@angular/ssr'
import { getContext } from '@netlify/angular-runtime/context.mjs'

const angularAppEngine = new AngularAppEngine()

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext()

  dotenv.config();

  const bodyParser = require('body-parser');
  const jsonParser = bodyParser.json();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  const app = express();
  const angularApp = new AngularNodeAppEngine();

  const openAI = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'], });

  app.post<string>('/dream', jsonParser, async (req, res) => {
    const prompt = `Interprete sonhos usando significados tradicionais, culturais e psicológicos; responda em até 4 linhas, de forma clara, neutra e educativa, sem previsões, diagnósticos ou conteúdos perigosos.
SEMPRE Responda no mesmo idioma do texto fornecido.
Você pode usar tags HTML simples (<b>, <i>) para destacar palavras importantes.
 "${req.body.input}"`
    const response = await openAI.responses.create({
      model: "gpt-4o-mini",
      input: prompt
    });

    res.json(response.output_text);
  })

  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );

  app.use('/**', (req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });

  if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  }
  // }

  const result = await angularAppEngine.handle(request, context)
  return result || new Response('Not found', { status: 404 })
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler)


/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
// export const reqHandler = createNodeRequestHandler(app);
