import React from "react"
import { Alert } from "react-bootstrap"

interface ErrorAlertProps {
    error: Error | undefined;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
    if (error) {
        return <Alert variant="danger">{error.message}</Alert>
    } else {
        return <></>
    }
}