import { pikkuMiddleware } from '../pikku-gen/pikku-types.gen.js'

/**
 * Logging middleware that works across all wiring types
 * (HTTP, Queue, Channel, MCP, RPC, Scheduler)
 *
 * The interaction parameter contains different objects based on the wiring type:
 * - HTTP: { http: PikkuHTTP }
 * - Channel: { channel: PikkuChannel }
 * - MCP: { mcp: PikkuMCP }
 * - RPC: { rpc: PikkuRPC }
 * - Queue: {} (empty object)
 * - Scheduler: {} (empty object)
 */
export const loggingMiddleware = pikkuMiddleware(
  async (services, interaction, next) => {
    const start = Date.now()

    // Determine the interaction type for better logging
    let interactionType = 'unknown'
    if (interaction.http) {
      interactionType = `HTTP ${interaction.http.request?.method()?.toUpperCase()} ${interaction.http.request?.path()}`
    } else if (interaction.channel) {
      interactionType = `Channel ${interaction.channel.channelId}`
    } else if (interaction.mcp) {
      interactionType = 'MCP'
    } else if (interaction.rpc) {
      interactionType = 'RPC'
    } else {
      interactionType = 'Queue/Scheduler'
    }

    services.logger.info(`[${interactionType}] Function execution started`)

    try {
      await next()
      const duration = Date.now() - start
      services.logger.info(
        `[${interactionType}] Function execution completed successfully in ${duration}ms`
      )
    } catch (error) {
      const duration = Date.now() - start
      services.logger.error(
        `[${interactionType}] Function execution failed after ${duration}ms:`,
        error
      )
      throw error
    }
  }
)
