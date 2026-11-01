import React from 'react';

const ORDER_STEPS = [
  { id: 'RECEIVED', label: 'Order Confirmed', icon: '📋', desc: 'Recipe queued in laboratory' },
  { id: 'BREWING', label: 'Extraction', icon: '☕', desc: 'Precision brewing in thermal chamber' },
  { id: 'CALIBRATION', label: 'Thermal Lock', icon: '❄️', desc: 'Cryogenic or thermal stabilization' },
  { id: 'DISPATCHED', label: 'Dispatched', icon: '🚀', desc: 'Courier in transit with telemetry' },
  { id: 'DELIVERED', label: 'Delivered', icon: '✨', desc: 'Arrived at your location' }
];

/**
 * Visual progress stepper for live order status and thermodynamic tracking
 * @param {{
 *   currentStep?: 'RECEIVED' | 'BREWING' | 'CALIBRATION' | 'DISPATCHED' | 'DELIVERED',
 *   orderId?: string,
 *   estimatedDeliveryTime?: string,
 *   className?: string
 * }} props
 */
export default function OrderProgressBar({
  currentStep = 'BREWING',
  orderId = '',
  estimatedDeliveryTime = '',
  className = ''
}) {
  const currentStepIndex = Math.max(
    0,
    ORDER_STEPS.findIndex((step) => step.id === currentStep)
  );

  const progressPercent = (currentStepIndex / (ORDER_STEPS.length - 1)) * 100;

  return (
    <div className={`bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Live Order Telemetry</span>
          {orderId && (
            <h3 className="text-lg font-mono font-bold text-white mt-0.5">
              Order #{orderId}
            </h3>
          )}
        </div>
        {estimatedDeliveryTime && (
          <div className="text-right">
            <span className="text-xs text-neutral-400">Estimated Arrival</span>
            <p className="text-sm font-semibold text-amber-400">{estimatedDeliveryTime}</p>
          </div>
        )}
      </div>

      {/* Progress Bar Track */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-800 -translate-y-1/2 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-400 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Step Nodes */}
        <div className="relative flex justify-between">
          {ORDER_STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-500/20 scale-110 shadow-lg shadow-amber-500/30'
                      : isCompleted
                      ? 'bg-emerald-500 text-neutral-950 ring-2 ring-emerald-500/30'
                      : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>
                <span
                  className={`text-xs mt-2 font-medium text-center transition-colors ${
                    isCurrent ? 'text-amber-300 font-semibold' : isCompleted ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {step.label}
                </span>
                <span className="hidden md:block text-[10px] text-neutral-500 text-center max-w-[90px] mt-0.5 leading-tight">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
