import React, { useState } from 'react';
import { message, Upload } from 'antd';
import style from './index.scss';

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};
const App = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	const uploadButton = (
		<div>
			<div
				className={style.homeCardUpDateImg}
			>
				Upload a file
			</div>
		</div>
	);
	return (
		<>
			<Upload
				className={style.homeCardUpDateImg}
				listType="picture-card"
				showUploadList={false}
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="avatar"
						style={{
							width: '100%',
						}}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</>
	);
};
export default App;