import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const displayFile = e.target[3].files[0];

		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// console.log(response);

			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, displayFile);
			uploadTask.on(
				(error) => {
					setErr(true);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(response.user, {
							displayName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, 'users', response.user.uid), {
							uid: response.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, 'userChats', response.user.uid), {});
						navigate('/');
					});
				}
			);
		} catch {
			setErr(true);
		}
	};

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">Chat App</span>
				<span className="title">Register</span>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="display name" />
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<input type="file" id="file" style={{ display: 'none' }} />
					<label htmlFor="file">
						<img src={Add} alt="" />
						<span>Add an avatar</span>
					</label>
					<button>Sign Up</button>
					{err && <span>Something happened . Try again later!!!</span>}
				</form>
				<p>
					You do have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};
