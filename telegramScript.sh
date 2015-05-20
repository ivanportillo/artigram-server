#!/bin/bash
variable=$(echo $LANG | sed -r -e 's/_.*//')
valor="d"
echo $variable
if [ "$variable" != "es" ]; then
	while [ "$valor" != "Y" -a "$valor" != "N" ]; do
	clear
	echo -e -n "\E[33mPackages \E[4mnpm\E[m\E[33m and \E[4mgit\E[m\E[33m are going to be installed (only those you haven't).\
	         	\nTip \E[32m\"Y\"\E[33m to accept and \E[31m\"N\"\E[33m to cancel and exit: \e[0m"
	read -p "" valor
	done
	if [ "$valor" == "N" ]; then
		exit
	elif [ "$valor" == "Y" ]; then
		npm &> /dev/null
		if [ $? -eq 127 ]; then
			#INSTALAR NPM, NODE... ETC
			sudo apt-get update
			sudo apt-get install nodejs
			sudo apt-get install npm
		else
			echo -e "\E[32mPackage node found.\e[0m"
		fi
		git &> /dev/null
		if [ $? -eq 127 ]; then
			#INSTALAR GIT, ETC
			sudo apt-get install git
		else
			echo -e "\E[32mPackage git found.\e[0m"
		fi
		if [ -d $HOME/tg ]; then
			echo -e "\E[31m¡Error! There is already a folder named \"$HOME/tg\"\e[0m"
		else
			sudo apt-get update
			sudo apt-get install libreadline-dev libconfig-dev libssl-dev lua5.2 liblua5.2-dev libevent-dev lua-lgi glib-2.0 make git-core libjansson-dev
			cd $HOME && git clone --recursive https://github.com/vysheng/tg.git && cd tg
			./configure && make
			clear
			echo -e -n "\E[32m\E[4mTelegram Notification System\E[m\E[32m has been installed in $HOME/tg. The client will start for first time.\
\nIn this place, you will have to introduce your phone number. \E[33mEx. +34666666666\e[0m\
\n\nPress \E[4mENTER\E[m to continue."
			read INTRO
			$HOME/tg/bin/telegram-cli -k $HOME/tg/tg-server.pub
		fi
	fi
else
	while [ "$valor" != "S" -a "$valor" != "N" ]; do
		clear
		echo -e -n "\E[33mSe instalarán los paquetes \E[4mnpm\E[m\E[33m y \E[4mgit\E[m\E[33m necesarios (solo los que no tenga).\
		         	\nIntroduzca \E[32m\"S\"\E[33m para aceptar y \E[31m\"N\"\E[33m para cancelar y salir: \e[0m"
		read -p "" valor
	done
	if [ "$valor" == "N" ]; then
		exit
	elif [ "$valor" == "S" ]; then
		npm &> /dev/null
		if [ $? -eq 127 ]; then
			#INSTALAR NPM, NODE... ETC
			sudo apt-get update
			sudo apt-get install nodejs
			sudo apt-get install npm
		else
			echo -e "\E[32mPaquete node encontrado.\e[0m"
		fi
		git &> /dev/null
		if [ $? -eq 127 ]; then
			#INSTALAR GIT, ETC
			sudo apt-get install git
		else
			echo -e "\E[32mPaquete git encontrado.\e[0m"
		fi
		if [ -d $HOME/tg ]; then
			echo -e "\E[31m¡Error! Ya existe la carpeta \"$HOME/tg\"\e[0m"
		else
			sudo apt-get update
			sudo apt-get install libreadline-dev libconfig-dev libssl-dev lua5.2 liblua5.2-dev libevent-dev lua-lgi glib-2.0 make git-core libjansson-dev
			cd $HOME && git clone --recursive https://github.com/vysheng/tg.git && cd tg
			./configure && make
			clear
			echo -e -n "\E[32mSe ha instalado el \E[4mCliente de Telegram\E[m\E[32m en $HOME/tg. Se va a iniciar el cliente por primera vez.\
\nDeberá introducir su número de teléfono. \E[33mEj: +34666666666\e[0m\
\n\nPulse \E[4mINTRO\E[m para continuar."
			read INTRO
			$HOME/tg/bin/telegram-cli -k $HOME/tg/tg-server.pub
		fi
	fi
fi