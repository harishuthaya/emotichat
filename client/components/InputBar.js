export const InputBar = ({ message, setMessage, sendMessage }) => (
  <form className="flex border-t-2 justify-center align-bottom">
    <input
      className="p-3 rounded w-96 max-w-xl"
      value={message}
      placeholder="Message..."
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button
      className="p-3 text-white bg-amber-500 hover:bg-amber-600 font-bold rounded focus:outline-none focus:shadow-outline"
      onClick={(event) => sendMessage(event)}
    >
      Send
    </button>
  </form>
);
