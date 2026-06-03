export const NotesWorkspace = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        overflowY: 'scroll',
      }}
    >
      {children}
    </div>
  );
};
