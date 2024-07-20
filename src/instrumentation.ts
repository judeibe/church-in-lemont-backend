import * as process from "process";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const traceExporter = new OTLPTraceExporter({
  url: "https://observe.judeibe.com/api/default/traces",
  headers: {
    Authorization: `Basic ${process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTHORIZATION}`,
  },
});

const spanProcessor =
  process.env.NODE_ENV === `development`
    ? new SimpleSpanProcessor(traceExporter)
    : new BatchSpanProcessor(traceExporter);

const otelSDK = new NodeSDK({
  spanProcessors: [spanProcessor],
  instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation()],
  serviceName: "church-in-lemont-backend",
});

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err),
    )
    .finally(() => process.exit(0));
});

export const registerInstrumentations = async () => {
  otelSDK.start();
};
