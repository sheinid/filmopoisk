import { useState } from "react";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";

import { LoginForm } from "../loginForm/loginForm";

export const LoginButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button onClick={handleClick}>Войти</Button>
			<Modal isOpen={isModalOpen} onClose={handleClose}>
				<LoginForm onClose={handleClose} />
			</Modal>
		</>
	);
};
