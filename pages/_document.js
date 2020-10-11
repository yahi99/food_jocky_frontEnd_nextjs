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
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="description" content="Food Jocky"/>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet"/>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw&libraries=places"></script>
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
