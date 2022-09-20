import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
// import { Timestamp } from 'firebase/firestore';

const Message = ({ message }) => {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);
	const ref = useRef();
	// console.log(message);
	// const date = new Timestamp(
	// 	message.date.seconds,
	// 	message.date.nanoseconds
	// ).toDate();
	// console.log(date);
	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	}, [message]);

	return (
		<div
			ref={ref}
			className={`message ${message.senderId === currentUser.uid && 'owner'}`}
		>
			<div className="messageInfo">
				<img
					src={
						message.sendeId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt="profile photo"
				/>
				{/* <span>{date}</span> */}
			</div>
			<div className="messageContent">
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt="message" />}
			</div>
		</div>
	);
};

export default Message;
