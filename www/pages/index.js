import url from 'url'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'

import Layout from '../components/Layout.js'

const absoluteUrl = (req, setLocalhost) => {
    let protocol = 'https'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost
        protocol = 'http'
    }

    return url.format({
        protocol,
        host,
        pathname: '/' // req.url
    })
}

export default class extends React.Component {



    static async getInitialProps(context) {
        /* NOTE - relative url in this function runs will not work and 
        will get ECONNRESET error since it runs on server context */
        const baseUrl = absoluteUrl(context.req, 'localhost:3000')
        const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/me` : 'http://localhost:9999/api/me'
        try {
            const { status, data } = await axios.get(apiUrl)
            return { user: data.user }
        }
        catch (ex) {
            console.log(`Error fetching data from ${apiUrl} - ${ex.message}`)
            return { user: null }
        }
    }

    render() {
        return (
            <Layout>
                <h1>NextJS + Express in Now v2</h1>
                {this.props.user &&
                    <div>
                        <h2>Data from API</h2>
                        <p>FirstName : {this.props.user.firstname}</p>
                        <p>LastName : {this.props.user.lastname}</p>
                    </div>
                }
            </Layout>
        )
    }
}



