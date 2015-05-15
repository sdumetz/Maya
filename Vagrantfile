# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise32"

  config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network :forwarded_port, guest: 3000, host: 3000

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.network :forwarded_port, host: 3001, guest: 3000
  # Give the guest OS access to the user's home dir for .ssh keys and so on.
  # Enable nfs for faster performance. Ingored on Windows host.
  config.vm.synced_folder "~/", "/host", nfs: true
  config.vm.provision :shell, :path => "provision/provision.sh"
end
