import React from 'react';
import Camera from '../img/cam.png';
import More from '../img/more.png';
import Add from '../img/add.png';
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
	const { data } = useContext(ChatContext);
	// console.log(data);
	return (
		<div className="chat">
			<div className="chatInfo">
				<span>{data.user?.displayName}</span>
				<div className="chatIcons">
					<img src={Camera} alt="camera" />
					<img src={Add} alt="add contact" />
					<img src={More} alt="more" />
				</div>
			</div>
			<Messages />
			<Input />
		</div>
	);
};

export default Chat;
