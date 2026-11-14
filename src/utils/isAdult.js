// AI-assistant: see docs/AI_LOG.md #9
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export function isAdult(birthDateValue) {
    if (!birthDateValue) {
        return false;
    }

    const birthDate = new Date(`${birthDateValue}T00:00:00`)

    if (Number.isNaN(birthDate.getTime())) {
        return false;
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasNotHadBirthdayThisYear = today.getMonth() < birthDate.getMonth() || (
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate()
    );

    if(hasNotHadBirthdayThisYear) {
        age -= 1;
    }

    return age >= 18;
}









