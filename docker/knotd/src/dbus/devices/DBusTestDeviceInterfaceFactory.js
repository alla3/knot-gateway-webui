import DBusInterfaceBuilder from 'dbus/DBusInterfaceBuilder';

const TEST_DEVICE_INTERFACE_NAME = 'TestDevice1';

class DBusTestDeviceInterfaceFactory {
  constructor(namespace) {
    this.namespace = namespace;
  }

  create(dbusInterfaceFactory, controller, id) {
    const interfaceName = this.getName(this.namespace);
    const iface = dbusInterfaceFactory.createInterface(interfaceName);

    const builder = new DBusInterfaceBuilder(iface, this.namespace);

    builder.addMethod(
      'Connect',
      [],
      [],
      controller.connect.bind(controller, id),
    );

    builder.addMethod(
      'Disconnect',
      [],
      [],
      controller.disconnect.bind(controller, id),
    );

    builder.addMethod(
      'Register',
      [],
      [],
      controller.register.bind(controller, id),
    );

    return builder.build();
  }

  getName(namespace) {
    return `${namespace}.${TEST_DEVICE_INTERFACE_NAME}`;
  }
}

export default DBusTestDeviceInterfaceFactory;
