import pricing from '../config/pricing';

// AI-assisted: see docs/AI_Log.md #7
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export function calculateFare({
    distanceKm,
    durationMin,
    category,
    tip = 0,
}) {
    const multiplier = pricing.categoryMultipliers[category];

    if (multiplier === undefined) {
        throw new Error(`Categoria no valida: ${category}`);
    }

    const distanceCost = distanceKm * pricing.pricePerKm;
    const durationCost = durationMin * pricing.pricePerMinute;

    const fareBeforeMinimum =
        pricing.baseFare + distanceCost + durationCost;

    const fareBeforeRounding = Math.max(
        fareBeforeMinimum * multiplier,
        pricing.minimumFare,
    );

    const fare = Math.round(
        fareBeforeRounding / pricing.roundingUnit
    ) * pricing.roundingUnit;

    const commission = Math.round(
        fare * pricing.commissionRate,
    );

    const driverEarnings = fare - commission + tip;

    return {
        fare,
        commission,
        driverEarnings,
    };
}