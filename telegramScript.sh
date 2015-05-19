#!/bin/bash
variable=$(echo $LANG | sed -r -e 's/_.*//')
valor="d"
echo $variable
if [ "$variable" != "es" ]; then
	while [ "$valor" != "Y" -a "$valor" != "N" ]; do
	clear
	echo -e -n "\E[33mSome packages are going to be installed (only those you haven't).\
	         	\nTip \E[32m\"Y\"\E[33m to accept and \E[31m\"N\"\E[33m to cancel and exit: \e[0m"
	read -p "" valor
	done
	if [ "$valor" == "N" ]; then
		exit
	elif [ "$valor" == "Y" ]; then
		npm >> /dev/null
		if [ $? -eq 0 ]; then
			#INSTALAR NPM, NODE... ETC
			sudo apt-get update
			sudo apt-get install nodejs
			sudo apt-get install npm
		else
			echo -e "\E[32mPackage node found.\e[0m"
		fi
		git >> /dev/null
		if [ $? -eq 0 ]; then
			#INSTALAR GIT, ETC
			sudo apt-get install git
		else
			echo -e "\E[32mPackage git found.\e[0m"
		fi
	fi
else
	while [ "$valor" != "S" -a "$valor" != "N" ]; do
		clear
		echo -e -n "\E[33mSe van a instalar los siguientes paquetes (solo los que no tenga).\
		         	\nIntroduzca \E[32m\"Y\"\E[33m para aceptar y \E[31m\"N\"\E[33m para cancelar y salir: \e[0m"
		read -p "" valor
	done
	if [ "$valor" == "N" ]; then
		exit
	elif [ "$valor" == "S" ]; then
		npm >> /dev/null
		if [ $? -eq 0 ]; then
			#INSTALAR NPM, NODE... ETC
			sudo apt-get update
			sudo apt-get install nodejs
			sudo apt-get install npm
		else
			echo -e "\E[32mPaquete node encontrado.\e[0m"
		fi
		git >> /dev/null
		if [ $? -eq 0 ]; then
			#INSTALAR GIT, ETC
			sudo apt-get install git
		else
			echo -e "\E[32mPaquete git encontrado.\e[0m"
		fi
	fi
fi