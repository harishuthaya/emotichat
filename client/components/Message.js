export const Message = ({ message, userId }) => {
  let isUser = false;
  console.log(message.id);
  console.log(userId);
  if (userId === message.id) isUser = true;

  return isUser ? (
    <div className="pr-3 flex justify-end text-white">
      <div classname="flex-col">
        <p className="text-left pr-2">{message.user}</p>
        <div className="max-w-md">
          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-sandy-brown text-black">
            {message.text}
          </span>
        </div>
        <p className="pr-2 text-end">{message.emotion}</p>
      </div>
    </div>
  ) : (
    <div className="pl-3 flex justify-start text-white">
      <div className="flex-col">
        <p className="pl-2">{message.user}</p>
        <div className="max-w-sm">
          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-black">
            {message.text}
          </span>
        </div>
        <p className="pl-2 text-right">{message.emotion}</p>
      </div>
    </div>
  );
};
