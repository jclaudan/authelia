import { ServerVariables } from "./ServerVariables";

import { Configuration } from "./configuration/schema/Configuration";
import { UsersDatabaseStub } from "./ldap/UsersDatabaseStub.spec";
import { AccessControllerStub } from "./access_control/AccessControllerStub.spec";
import { RequestLoggerStub } from "./logging/RequestLoggerStub.spec";
import { NotifierStub } from "./notifiers/NotifierStub.spec";
import { RegulatorStub } from "./regulation/RegulatorStub.spec";
import { TotpHandlerStub } from "./authentication/totp/TotpHandlerStub.spec";
import { UserDataStoreStub } from "./storage/UserDataStoreStub.spec";
import { U2fHandlerStub } from "./authentication/u2f/U2fHandlerStub.spec";

export interface ServerVariablesMock {
  accessController: AccessControllerStub;
  config: Configuration;
  usersDatabase: UsersDatabaseStub;
  logger: RequestLoggerStub;
  notifier: NotifierStub;
  regulator: RegulatorStub;
  totpHandler: TotpHandlerStub;
  userDataStore: UserDataStoreStub;
  u2f: U2fHandlerStub;
}

export class ServerVariablesMockBuilder {
  static build(enableLogging?: boolean): { variables: ServerVariables, mocks: ServerVariablesMock} {
    const mocks: ServerVariablesMock = {
      accessController: new AccessControllerStub(),
      config: {
        access_control: {},
        authentication_methods: {
          default_method: "two_factor"
        },
        totp: {
          issuer: "authelia.com"
        },
        ldap: {
          url: "ldap://ldap",
          base_dn: "dc=example,dc=com",
          user: "user",
          password: "password",
          mail_attribute: "mail",
          additional_users_dn: "ou=users",
          additional_groups_dn: "ou=groups",
          users_filter: "cn={0}",
          groups_filter: "member={dn}",
          group_name_attribute: "cn"
        },
        logs_level: "debug",
        notifier: {},
        port: 8080,
        regulation: {
          ban_time: 50,
          find_time: 50,
          max_retries: 3
        },
        session: {
          secret: "my_secret",
          domain: "mydomain"
        },
        storage: {}
      },
      usersDatabase: new UsersDatabaseStub(),
      logger: new RequestLoggerStub(enableLogging),
      notifier: new NotifierStub(),
      regulator: new RegulatorStub(),
      totpHandler: new TotpHandlerStub(),
      userDataStore: new UserDataStoreStub(),
      u2f: new U2fHandlerStub()
    };
    const vars: ServerVariables = {
      accessController: mocks.accessController,
      config: mocks.config,
      usersDatabase: mocks.usersDatabase,
      logger: mocks.logger,
      notifier: mocks.notifier,
      regulator: mocks.regulator,
      totpHandler: mocks.totpHandler,
      userDataStore: mocks.userDataStore,
      u2f: mocks.u2f
    };

    return {
      variables: vars,
      mocks: mocks
    };
  }
}