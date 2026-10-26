/**
 * HOT COOL SHAKE Order Status Webhook Dispatcher
 * Dispatches simulated webhook events for telemetry tracking and external integrations.
 */

export const ORDER_STAGES = [
  { status: 'PLACED', message: 'Order received by Central Roastery' },
  { status: 'CHAMBER_EXTRACTION', message: 'Chamber-X™ thermal or cryo extraction in progress' },
  { status: 'CLIMATE_LOCK', message: 'Vessel hermetically sealed at precise target temperature' },
  { status: 'IN_TRANSIT', message: 'Dispatched via electric courier with live IoT telemetry' },
  { status: 'DELIVERED', message: 'Order delivered directly into customer hands' },
];

/**
 * Dispatch simulated webhook payload
 */
export async function dispatchOrderStatusWebhook(orderId, stageIndex = 0, targetEndpoint = null) {
  const currentStage = ORDER_STAGES[Math.min(stageIndex, ORDER_STAGES.length - 1)];

  const payload = {
    event: 'order.status_updated',
    orderId,
    timestamp: new Date().toISOString(),
    status: currentStage.status,
    description: currentStage.message,
    telemetry: {
      temperature: currentStage.status === 'CHAMBER_EXTRACTION' ? '68.2°C' : '04.1°C',
      vibrationIndex: '0.02g',
      sealIntegrity: '100% NOMINAL',
    },
  };

  if (targetEndpoint) {
    try {
      await fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn(`[Webhook Notice] Unable to deliver to ${targetEndpoint}:`, err.message);
    }
  }

  return payload;
}
