import Head from 'next/head'

const Layout = (props) => (
    <div>
        <Head>
            <title>NextJS with Express in Now v2</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <style jsx global>{`
            body {
                padding: 10px;
            }
          `}</style>
        {props.children}
    </div>
)

export default Layout