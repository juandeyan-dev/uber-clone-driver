import React, { createContext, useState, useContext, useMemo } from 'react';
import { isAdult } from '../../utils/isAdult';


//AI-assistant: see docs/AI_LOG.md #4
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

const RegistrationContext = createContext(null);

const initialForm = {
    personal: {
        profilePhoto: '',
        fullName: '',
        identityNumber: '',
        phone: '',
        birthDate: '',
        gender: '',
        email: '',
        language: '',
    },
    vehicle: {
        category: '',
        plate: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        capacity: '',
        vehiclePhoto: '',
    },
    documents: {
        licenseNumber: '',
        licensePhoto: '',
        licenseExpiration: '',
        soatPhoto: '',
        soatExpiration: '',
        technicalReviewPhoto: '',
        technicalReviewExpiration: '',
        mercadoPagoEmail: '',
        acceptedTerms: false,
    },
};

function isExpirationDateValid(dateValue) {
    if (!dateValue) {
        return false;
    }

    const expirationDate = new Date(`${dateValue}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return expirationDate > today;
}

export function RegistrationProvider({ children }) {
    const [form, setForm] = useState(initialForm);

    function updateSection(section, field, value) {
        setForm((previousForm) => ({
            ...previousForm,
            [section]: {
                ...previousForm[section],
                [field]: value,
            },
        }));
    }

    const formIsComplete = useMemo(() => {
        const { personal, vehicle, documents } = form;

        const personalComplete =
            personal.fullName.trim() !== '' &&
            personal.identityNumber.trim() !== '' &&
            personal.phone.trim() !== '' &&
            isAdult(personal.birthDate) &&
            personal.gender.trim() !== '' &&
            personal.email.trim() !== '';

        const vehicleComplete =
            vehicle.category.trim() !== '' &&
            vehicle.plate.trim() !== '' &&
            vehicle.brand.trim() !== '' &&
            vehicle.model.trim() !== '' &&
            vehicle.year.trim() !== '' &&
            vehicle.color.trim() !== '' &&
            vehicle.capacity.trim() !== '';

        const documentsComplete =
            documents.licenseNumber.trim() !== '' &&
            isExpirationDateValid(documents.licenseExpiration) &&
            isExpirationDateValid(documents.soatExpiration) && // AI-assisted: see docs/AI_LOG.md #11
            documents.mercadoPagoEmail.trim() !== '' &&
            documents.acceptedTerms === true;

        return personalComplete && vehicleComplete && documentsComplete;
    }, [form]);

    const value = {
        form,
        updateSection,
        formIsComplete,
    };

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );
}
export function useRegistration() {
    const context = useContext(RegistrationContext);

    if (!context) {
        throw new Error(
            'useRegistration debe utilizarse dentro de un RegistrationProvider'
        )
    }
    return context;
}