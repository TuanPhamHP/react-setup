export const convertDateTimeGroup = dateString => {
	const current = new Date();
	const _date = current.getDate().toString().padStart(2, '0');
	const _month = (current.getMonth() + 1).toString().padStart(2, '0');
	const _year = current.getFullYear().toString();

	const now = new Date(dateString);
	const date = now.getDate().toString().padStart(2, '0');
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const year = now.getFullYear().toString();

	const minutes = now.getMinutes().toString().padStart(2, '0');
	const hours = now.getHours().toString().padStart(2, '0');

	let dateResult = `${date}/${month}/${year}`;

	if (dateResult === `${_date}/${_month}/${_year}`) {
		dateResult = 'Today';
	}

	return `${dateResult} ${hours}:${minutes}`;
};
export const getLmTime = _lm => {
	if (!_lm) {
		return '---';
	}
	const gap = new Date().getTime() - new Date(_lm).getTime();
	const curentH = new Date().getHours();

	const time = new Date(_lm);
	const hours = time.getHours().toString().padStart(2, '0');
	const min = time.getMinutes().toString().padStart(2, '0');
	const date = time.getDate().toString().padStart(2, '0');
	const month = (time.getMonth() + 1).toString().padStart(2, '0');
	let str = '';
	if (gap < curentH * 60 * 60 * 1000) {
		str = `Today ${hours}:${min}`;
	} else if (gap < 48 * 60 * 60 * 1000) {
		str = `Today ${hours}:${min}`;
	} else {
		str = `${date}/${month} ${hours}:${min}`;
	}
	return str;
};
export const formatUserNameFromId = str => {
	if (!str || !['string', 'number'].includes(typeof str)) {
		return 'Unknow';
	}
	return String(str).slice(-4);
};

const getDayOfMessage = messageTime => {
	const now = new Date(messageTime);
	const date = now.getDate().toString().padStart(2, '0');
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const year = now.getFullYear().toString();

	return `${date}/${month}/${year}`;
};

const sortMessages = messages => {
	return messages.sort((m1, m2) => {
		let time1 = m1.ts;
		let time2 = m2.ts;

		if (new Date(time1) < new Date(time2)) {
			return -1;
		} else if (new Date(time1) > new Date(time2)) {
			return 1;
		} else return 0;
	});
};
export const splitMessages = messages => {
	const distance = 60 * 3; // 3'
	let currentDay = '';
	let currentUser = '';
	let result = [];
	let objectIds = {};
	const _messages = sortMessages(messages);

	for (let message of _messages) {
		if (objectIds[message._id]) continue;
		objectIds[message._id] = message._id;
		if (currentDay && getDayOfMessage(message.timestamp) !== getDayOfMessage(currentDay)) {
			result.push({
				breaking_day: message.timestamp,
			});
		}

		// if (message.t) {
		//   result.push(message);
		//   currentDay = message.ts;
		//   currentUser = '';
		//   continue;
		// }

		// if (currentUser === message.u._id) {
		//   if (result.length === 0) {
		//     result[result.length] = {
		//       u: message.u,
		//       messages: [message]
		//     };
		//   } else {
		//     if (
		//       !result[result.length - 1].t &&
		//       !result[result.length - 1].breaking_day
		//     ) {
		//       const firstMessageInBlock = result[result.length - 1].messages[0];
		//       const timeOfFirstMessage = new Date(firstMessageInBlock.ts).getTime();
		//       const timeOfCurrentMessage = new Date(message.ts).getTime();

		//       if ((timeOfCurrentMessage - timeOfFirstMessage) / 1000 <= distance) {
		//         if (result[result.length - 1]) {
		//           result[result.length - 1].messages = result[
		//             result.length - 1
		//           ].messages.concat(message);
		//         } else {
		//           result[result.length - 1] = {
		//             u: message.u,
		//             messages: [message]
		//           };
		//         }
		//       } else {
		//         result[result.length] = {
		//           u: message.u,
		//           messages: [message]
		//         };
		//       }
		//     } else {
		//       result[result.length] = {
		//         u: message.u,
		//         messages: [message]
		//       };
		//     }
		//   }
		// } else {
		//   result[result.length] = {
		//     u: message.u,
		//     messages: [message]
		//   };
		// }
		// currentDay = message.ts;
		// currentUser = message.u._id;
	}

	return result;
};
