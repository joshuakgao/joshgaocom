import subprocess


def get_ip_address():
    # run to get ip addresses: $ hostname -I
    ip_addresses, error = subprocess.Popen(
        ["hostname", "-I"], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    ).communicate()

    # get the first ip addres by spliting by space
    ip_address = ip_addresses.decode("utf-8").split()[0]

    return ip_address
