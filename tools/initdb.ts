import fs from "fs-extra";
import { Client } from "pg";
import config from 'config'
import logger from '../src/utils/logger'

const init = async () => {
    // read environment variables

    // create an instance of the PostgreSQL client
    const PGHOST = config.get<string>('PGHOST')
    const PGUSER = config.get<string>('PGUSER')
    const PGDATABASE = config.get<string>('PGDATABASE')
    const PGPASSWORD = config.get<string>('PGPASSWORD')
    const PGPORT = config.get<number>('PGPORT')

    const client = new Client({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASE,
        password: PGPASSWORD,
        port: PGPORT,
    });

    try {
        // connect to the local database server
        await client.connect();
        
        // read the contents of the initdb.pgsql file
        const sql = await fs.readFile( "./tools/initdb.pgsql", { encoding: "UTF-8" } );

        // split the file into separate statements
        const statements = sql.split( /;\s*$/m );

        for ( const statement of statements ) {
            if ( statement.length > 3 ) {
                // execute each of the statements
                await client.query( statement );
            }
        }

    } catch (e) {
        logger.error(e);
        throw e;
    } finally {
        await client.end();
    }
};

init().then( () => {
    logger.info( "finished" );
} ).catch( () => {
    logger.error( "finished with errors" );
} );