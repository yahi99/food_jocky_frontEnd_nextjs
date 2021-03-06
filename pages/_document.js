import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() { 
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="description" content="Food Jocky"/>
                    {/* <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap" rel="stylesheet"></link> */}
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk&libraries=places"></script>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
