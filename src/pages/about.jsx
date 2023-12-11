export default function Page({ title }) {
  return (
    <>
      <h1>Page about</h1>
      <a href="/">Index</a>
      <div>
        <div>{title}</div>
      </div>
    </>
  );
}

export const getServersideProps = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return {
    props: {
      title: 'Hello server side props',
    },
  };
}